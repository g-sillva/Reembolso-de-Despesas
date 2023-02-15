package com.fss.reembolso.lancamento;

import com.fss.reembolso.lancamento.Enums.Categoria;
import com.fss.reembolso.usuario.DTOs.UsuarioDTO;
import com.fss.reembolso.usuario.Usuario;
import com.fss.reembolso.usuario.UsuarioRepository;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LancamentoServiceImpl implements LancamentoService{

    private LancamentoRepository lancamentoRepository;
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Lancamento> getTodosLancamentos() {
        return lancamentoRepository.findAll();
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
    public Lancamento patchUsuario(String id, Map<String, Object> fields) {
        Optional<Lancamento> l = lancamentoRepository.findById(id);
        if (l.isPresent()) {
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
}
