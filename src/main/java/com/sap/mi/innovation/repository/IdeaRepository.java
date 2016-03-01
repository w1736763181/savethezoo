package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.model.IdeaEntity;
import com.sap.mi.innovation.model.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by I309891 on 1/12/2016.
 */
@Repository
public interface IdeaRepository extends JpaRepository<IdeaEntity, Integer> {
    List<IdeaEntity> findById(int id);

    @Modifying
    @Transactional
    @Query("update IdeaEntity idea set likes = likes + 1 where id = ?1")
    int voting(Integer id);

    @Modifying
    @Transactional
    @Query("update IdeaEntity idea set status = 1 where id = ?1")
    int approve(Integer id);


    @Modifying
    @Transactional
    @Query("update IdeaEntity idea set status = 2, pid=?1 where id = ?2")
    int generateProject(Integer pid, Integer id);
}
