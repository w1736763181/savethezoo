package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.model.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by I309908 on 1/26/2016.
 */
@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    @Modifying
    @Transactional
    @Query("update ProjectEntity project set likes = likes + 1 where id = ?1")
    int voting(Integer id);

    @Modifying
    @Transactional
    @Query("update ProjectEntity project set status = ?1 where id = ?2")
    int setStatus(Integer stauts, Integer id);
}