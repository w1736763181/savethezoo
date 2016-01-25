package com.sap.mi.innovation.model;

import javax.persistence.*;

/**
 * Created by I309891 on 1/12/2016.
 */
@Entity
@Table(name = "voting", schema = "public", catalog = "innovation")
public class VotingEntity {
    private Integer id;
    private Integer uid;
    private Integer ideaid;
    private Integer istatus;
    private String comment;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Basic
    @Column(name = "uid")
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    @Basic
    @Column(name = "ideaid")
    public Integer getIdeaid() {
        return ideaid;
    }

    public void setIdeaid(Integer ideaid) {
        this.ideaid = ideaid;
    }

    @Basic
    @Column(name = "istatus")
    public Integer getIstatus() {
        return istatus;
    }

    public void setIstatus(Integer istatus) {
        this.istatus = istatus;
    }

    @Basic
    @Column(name = "comment")
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VotingEntity that = (VotingEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (uid != null ? !uid.equals(that.uid) : that.uid != null) return false;
        if (ideaid != null ? !ideaid.equals(that.ideaid) : that.ideaid != null) return false;
        if (istatus != null ? !istatus.equals(that.istatus) : that.istatus != null) return false;
        if (comment != null ? !comment.equals(that.comment) : that.comment != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (uid != null ? uid.hashCode() : 0);
        result = 31 * result + (ideaid != null ? ideaid.hashCode() : 0);
        result = 31 * result + (istatus != null ? istatus.hashCode() : 0);
        result = 31 * result + (comment != null ? comment.hashCode() : 0);
        return result;
    }
}
