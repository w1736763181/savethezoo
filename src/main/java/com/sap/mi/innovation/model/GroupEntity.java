package com.sap.mi.innovation.model;

import javax.persistence.*;

/**
 * Created by I309891 on 1/12/2016.
 */
@Entity
@Table(name = "group", schema = "public", catalog = "innovation")
public class GroupEntity {
    private Integer id;
    private Integer pid;
    private Integer uid;
    private Integer job;

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
    @Column(name = "pid")
    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
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
    @Column(name = "job")
    public Integer getJob() {
        return job;
    }

    public void setJob(Integer job) {
        this.job = job;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GroupEntity that = (GroupEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (pid != null ? !pid.equals(that.pid) : that.pid != null) return false;
        if (uid != null ? !uid.equals(that.uid) : that.uid != null) return false;
        if (job != null ? !job.equals(that.job) : that.job != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (pid != null ? pid.hashCode() : 0);
        result = 31 * result + (uid != null ? uid.hashCode() : 0);
        result = 31 * result + (job != null ? job.hashCode() : 0);
        return result;
    }
}
