package com.eazyapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name="phone_number")
   // @Pattern(regexp = "^\\\\+[1-9]\\\\\\\\d{1,14}$")
    private String phoneNumber;

    @Column(name = "unique_id",unique = true)
    private String uniqueId;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


}
