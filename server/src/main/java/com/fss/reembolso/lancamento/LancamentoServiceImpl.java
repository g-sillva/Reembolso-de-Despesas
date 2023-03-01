package com.fss.reembolso.lancamento;

import com.fss.reembolso.lancamento.Enums.Categoria;
import com.fss.reembolso.lancamento.Enums.Status;
import com.fss.reembolso.notificacao.Notificacao;
import com.fss.reembolso.notificacao.NotificacaoRepository;
import com.fss.reembolso.notificacao.NotificacaoService;
import com.fss.reembolso.usuario.Usuario;
import com.fss.reembolso.usuario.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LancamentoServiceImpl implements LancamentoService{

    private LancamentoRepository lancamentoRepository;
    private UsuarioRepository usuarioRepository;
    private NotificacaoRepository notificacaoRepository;

    @Override
    public Page<Lancamento> getTodosLancamentos(String titulo, String descricao, String status, String ano, String mes, String dia, String categoria, Pageable pageable) {
        Page<Lancamento> paginaLancamentos = lancamentoRepository.findAll(pageable);

        List<Lancamento> resultadoLancamentos = paginaLancamentos.getContent().stream().filter(x ->
                x.getTitulo().toLowerCase().contains(titulo.toLowerCase()) &&
                        x.getDescricao().toLowerCase().contains(descricao.toLowerCase()) &&
                        x.getStatus().name().toLowerCase().contains(status.toLowerCase()) &&
                        !x.getStatus().name().toLowerCase().contains("em_rascunho") &&
                        x.getCategoria().name().toLowerCase().contains(categoria.toLowerCase()) &&
                        Integer.toString(x.getData().getYear()).contains(ano.equals("") ? Integer.toString(x.getData().getYear()) : ano) &&
                        Integer.toString(x.getData().getMonthValue()).contains(mes.equals("") ? Integer.toString(x.getData().getMonthValue()) : mes) &&
                        Integer.toString(x.getData().getDayOfMonth()).contains(dia.equals("") ? Integer.toString(x.getData().getDayOfMonth()) : dia)
        ).toList();
        paginaLancamentos = new PageImpl<>(resultadoLancamentos);

        return paginaLancamentos;
    }

    @Override
    public Page<Lancamento> getLancamentosPorUsuarioId(String usuario_id, Pageable pageable) {
        return lancamentoRepository.findByUsuarioId(usuario_id, pageable);
    }

    @Override
    public Lancamento salvarLancamento(Lancamento lancamento, MultipartFile file) throws IOException {
        Optional<Usuario> usuario = usuarioRepository.findById(lancamento.getUsuarioId());
        if (usuario.isPresent()) {
            if (usuario.get().getLancamentos() == null) {
                usuario.get().setLancamentos(List.of(lancamento));
            } else {
                usuario.get().getLancamentos().add(lancamento);
            }
            lancamento.setImg(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            lancamentoRepository.save(lancamento);
            usuarioRepository.save(usuario.get());
            return lancamento;
        }
        return null;
    }

    @Override
    public Lancamento getLancamentoPorId(String id) {
        return lancamentoRepository.findById(id).orElse(null);
    }

    @Override
    public Lancamento patchLancamento(String id, Map<String, Object> fields, MultipartFile img) throws IOException {
        Optional<Lancamento> l = lancamentoRepository.findById(id);
        if (l.isPresent()) {

            if (img != null && !img.isEmpty()) {
                l.get().setImg(new Binary(BsonBinarySubType.BINARY, img.getBytes()));
            }

            fields.forEach((k, v) -> {
                Field field = ReflectionUtils.findField(Lancamento.class, k);
                field.setAccessible(true);

                if (field.getName().equalsIgnoreCase("status")) {
                    Notificacao notificacao = new Notificacao();
                    notificacao.setTitulo("O seu lançamento mudou de status!");
                    notificacao.setMsg("O lançamento: '" + l.get().getTitulo() + "' teve o seu status alterado para " + v.toString().replaceAll("-", " "));
                    notificacao.setUsuarioId(l.get().getUsuarioId());
                    notificacaoRepository.save(notificacao);

                    Status status = Status.valueOf(v.toString());
                    l.get().setStatus(status);
                } else if (field.getName().equalsIgnoreCase("categoria")) {
                    Categoria c = Categoria.valueOf(v.toString().toUpperCase());
                    l.get().setCategoria(c);
                } else {
                    ReflectionUtils.setField(field, l.get(), v);
                }
            });
            lancamentoRepository.save(l.get());
            return l.get();
        }
        return null;
    }

    @Override
    public boolean deletarLancamento(String id) {
        Optional<Lancamento> l = lancamentoRepository.findById(id);
        if (l.isPresent()) {
            lancamentoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
