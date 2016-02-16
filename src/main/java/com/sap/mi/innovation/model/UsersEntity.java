package com.sap.mi.innovation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.annotation.Generated;
import javax.persistence.*;

/**
 * Created by I309908 on 1/26/2016.
 */
@Entity
@Table(name = "users", schema = "public", catalog = "innovation")
public class UsersEntity {
    private Integer id;
    private String email;
    private String firstname;
    private String lastname;
    private String department;
    private String phone;
    private String head;
    private String password;
    private Integer coin;
    private Integer authentication = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "email", nullable = true, length = -1)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "firstname", nullable = true, length = 50)
    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    @Basic
    @Column(name = "lastname", nullable = true, length = 50)
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @Basic
    @Column(name = "department", nullable = true, length = 50)
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Basic
    @Column(name = "phone", nullable = true, length = 15)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "head", nullable = true, length = 30)
    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    @Basic
//    @JsonIgnore
    @Column(name = "password", nullable = true, length = 20)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "coin", nullable = true)
    public Integer getCoin() {
        return coin;
    }

    public void setCoin(Integer coin) {
        this.coin = coin;
    }

    @Basic
    @Column(name = "authentication", nullable = true, length = 20)
    public Integer getAuth() {
        return authentication;
    }
    public void setAuth(Integer auth) {
        this.authentication = auth;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UsersEntity that = (UsersEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (firstname != null ? !firstname.equals(that.firstname) : that.firstname != null) return false;
        if (lastname != null ? !lastname.equals(that.lastname) : that.lastname != null) return false;
        if (department != null ? !department.equals(that.department) : that.department != null) return false;
        if (phone != null ? !phone.equals(that.phone) : that.phone != null) return false;
        if (head != null ? !head.equals(that.head) : that.head != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (coin != null ? !coin.equals(that.coin) : that.coin != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (firstname != null ? firstname.hashCode() : 0);
        result = 31 * result + (lastname != null ? lastname.hashCode() : 0);
        result = 31 * result + (department != null ? department.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (head != null ? head.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (coin != null ? coin.hashCode() : 0);
        return result;
    }
}
