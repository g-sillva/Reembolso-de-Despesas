package com.fss.reembolso.notificacao;

import com.fss.reembolso.exceptions.RequestResponse;
import com.fss.reembolso.usuario.Usuario;
import com.fss.reembolso.usuario.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NotificacaoServiceImpl implements NotificacaoService{

    private NotificacaoRepository notificacaoRepository;
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Notificacao> getNotificacoes(String titulo, String ano, String mes, String dia, String msg, String usuario) {
        List<Notificacao> notificacaos = notificacaoRepository.findAll();
        notificacaos = notificacaos.stream().filter(x ->
                x.getTitulo().toLowerCase().contains(titulo.toLowerCase()) &&
                        x.getMsg().toLowerCase().contains(msg.toLowerCase()) &&
                        x.getUsuarioId().toLowerCase().contains(usuario.toLowerCase()) &&
                        Integer.toString(x.getData().getYear()).contains(ano.equals("") ? Integer.toString(x.getData().getYear()) : ano) &&
                        Integer.toString(x.getData().getMonthValue()).contains(mes.equals("") ? Integer.toString(x.getData().getMonthValue()) : mes) &&
                        Integer.toString(x.getData().getDayOfMonth()).contains(dia.equals("") ? Integer.toString(x.getData().getDayOfMonth()) : dia)
        ).collect(Collectors.toList());
        return notificacaos;
    }

    @Override
    public Notificacao getNotificacaoPorId(String id) {
        return notificacaoRepository.findById(id).orElse(null);
    }

    @Override
    public Notificacao visualizarNotificacao(String id) {
        Optional<Notificacao> n = notificacaoRepository.findById(id);
        if (n.isPresent()) {
            n.get().setVisto(true);
            notificacaoRepository.save(n.get());
        }
        return n.orElse(null);
    }

    @Override
    public ResponseEntity<?> adicionarNotificacao(Notificacao notificacao) {
        Optional<Usuario> usuario = usuarioRepository.findById(notificacao.getUsuarioId());
        if (usuario.isPresent()) {
            notificacaoRepository.save(notificacao);

            if (usuario.get().getNotificacaos() == null) {
                usuario.get().setNotificacaos(List.of(notificacao));
            } else {
                usuario.get().getNotificacaos().add(notificacao);
            }
            usuarioRepository.save(usuario.get());

            return new ResponseEntity<>(new RequestResponse("Notificação salva com sucesso!"), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(new RequestResponse("Usuário não encontrado."), HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public boolean deletarNotificacao(String id) {
        Optional<Notificacao> n = notificacaoRepository.findById(id);
        if (n.isPresent()) {
            notificacaoRepository.delete(n.get());
            return true;
        }
        return false;
    }
}
