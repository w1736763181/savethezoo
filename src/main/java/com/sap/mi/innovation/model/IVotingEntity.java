package com.sap.mi.innovation.model;

import javax.persistence.*;

/**
 * Created by I309908 on 1/26/2016.
 */
@Entity
@Table(name = "i_voting", schema = "public", catalog = "innovation")
public class IVotingEntity {
    private Integer id;
    private Integer uid;
    private Integer ideaid;

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
    @Column(name = "uid", nullable = true)
    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IVotingEntity that = (IVotingEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (uid != null ? !uid.equals(that.uid) : that.uid != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (uid != null ? uid.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "ideaid", nullable = true)
    public Integer getIdeaid() {
        return ideaid;
    }

    public void setIdeaid(Integer ideaid) {
        this.ideaid = ideaid;
    }
}
