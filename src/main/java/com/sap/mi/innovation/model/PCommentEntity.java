package com.sap.mi.innovation.model;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by I309891 on 2/22/2016.
 */
@Entity
@Table(name = "p_comment", schema = "public", catalog = "innovation")
public class PCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "uid", nullable = true)
    private Integer uid;
    @Basic
    @Column(name = "pid", nullable = true)
    private Integer pid;
    @Basic
    @Column(name = "comment", nullable = true)
    private String text;
    @Column(name= "createtime", nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="uid", referencedColumnName = "id", insertable=false, updatable=false)
    private UsersEntity user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer ideaid) {
        this.pid = ideaid;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCreatedAt() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(createdAt);
    }

    public void setCreatedAt(String createdAt) throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.createdAt = df.parse(createdAt);
    }

    public UsersEntity getUser() {
        return user;
    }

    public void setUser(UsersEntity user) {
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
}
