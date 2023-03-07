package com.fss.reembolso.usuario;

import com.fss.reembolso.lancamento.Lancamento;
import com.fss.reembolso.notificacao.Notificacao;
import com.fss.reembolso.usuario.DTOs.UsuarioRegistroDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Document(value = "usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario implements UserDetails {

    @Id
    private String id;

    private String codigoVerificacao;

    @NotBlank(message = "O nome não pode estar vazio")
    private String nome;

    @NotBlank(message = "O e-mail não pode estar vazio")
    @Indexed(unique = true)
    private String email;

    @CreatedDate
    private LocalDate dataCadastro;

    @NotBlank(message = "O telefone não pode estar vazio")
    @Pattern(regexp = "^[0-9]*$", message = "Telefone inválido")
    private String telefone;

    private List<Role> roles = List.of(Role.USER);

    @DBRef
    private List<Lancamento> lancamentos = new ArrayList<>();

    @DBRef
    private List<Notificacao> notificacaos = new ArrayList<>();

    private boolean ativo;

    @NotBlank(message = "A senha não pode estar vazia")
    private String senha;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        roles.forEach(x -> list.add(new SimpleGrantedAuthority("ROLE_" + x)));
        return list;
    }

    public Usuario(UsuarioRegistroDTO usuarioRegistro) {
        this.nome = usuarioRegistro.getNome();
        this.email = usuarioRegistro.getEmail();
        this.telefone = usuarioRegistro.getTelefone();
        this.senha = usuarioRegistro.getSenha();
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return ativo;
    }
}
