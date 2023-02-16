package com.fss.reembolso.lancamento;

import com.fss.reembolso.lancamento.Enums.Categoria;
import com.fss.reembolso.usuario.Usuario;
import com.fss.reembolso.usuario.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
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

    @Override
    public List<Lancamento> getTodosLancamentos(String titulo, String descricao, String status, String ano, String mes, String categoria, String usuario_id) {
        List<Lancamento> lancamentos = lancamentoRepository.findAll();
        lancamentos = lancamentos.stream().filter(x ->
                x.getTitulo().toLowerCase().contains(titulo.toLowerCase()) &&
                        x.getDescricao().toLowerCase().contains(descricao.toLowerCase()) &&
                        x.getStatus().name().toLowerCase().contains(status.toLowerCase()) &&
                        x.getCategoria().name().toLowerCase().contains(categoria.toLowerCase()) &&
                        x.getUsuarioId().toLowerCase().contains(usuario_id.toLowerCase()) &&
                        Integer.toString(x.getData().getYear()).contains(ano.equals("") ? Integer.toString(x.getData().getYear()) : ano) &&
                        Integer.toString(x.getData().getMonthValue()).contains(mes.equals("") ? Integer.toString(x.getData().getMonthValue()) : mes)
        ).collect(Collectors.toList());

        return lancamentos;
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
    public Lancamento patchUsuario(String id, Map<String, Object> fields, MultipartFile img) throws IOException {
        Optional<Lancamento> l = lancamentoRepository.findById(id);
        if (l.isPresent()) {

            if (!img.isEmpty()) {
                l.get().setImg(new Binary(BsonBinarySubType.BINARY, img.getBytes()));
            }

            fields.forEach((k, v) -> {
                Field field = ReflectionUtils.findField(Lancamento.class, k);
                field.setAccessible(true);

                if (field.getName().equalsIgnoreCase("categoria")) {
                    Categoria c = Categoria.findByName(v.toString());
                    if (c == null) return;

                    ReflectionUtils.setField(field, l.get(), c);
                } else {
                    ReflectionUtils.setField(field, l.get(), v);
                }
            });
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
