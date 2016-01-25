package com.sap.mi.innovation.model;

import javax.persistence.*;

/**
 * Created by I309891 on 1/12/2016.
 */
@Entity
@Table(name = "idea", schema = "public", catalog = "innovation")
public class IdeaEntity {
    private Integer id;
    private Integer uid;
    private Integer cid;
    private String title;
    private String content;
    private Integer status;
    private Integer iVote;
    private Integer pVote;

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
    @Column(name = "cid")
    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "status")
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Basic
    @Column(name = "i_vote")
    public Integer getiVote() {
        return iVote;
    }

    public void setiVote(Integer iVote) {
        this.iVote = iVote;
    }

    @Basic
    @Column(name = "p_vote")
    public Integer getpVote() {
        return pVote;
    }

    public void setpVote(Integer pVote) {
        this.pVote = pVote;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IdeaEntity that = (IdeaEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (uid != null ? !uid.equals(that.uid) : that.uid != null) return false;
        if (cid != null ? !cid.equals(that.cid) : that.cid != null) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (content != null ? !content.equals(that.content) : that.content != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (iVote != null ? !iVote.equals(that.iVote) : that.iVote != null) return false;
        if (pVote != null ? !pVote.equals(that.pVote) : that.pVote != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (uid != null ? uid.hashCode() : 0);
        result = 31 * result + (cid != null ? cid.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (iVote != null ? iVote.hashCode() : 0);
        result = 31 * result + (pVote != null ? pVote.hashCode() : 0);
        return result;
    }
}
