package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.model.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by I309891 on 1/12/2016.
 */
@Repository
public interface UserRepository extends JpaRepository<UsersEntity, Integer>{

    List<UsersEntity> findUserByEmail(String email);
    List<UsersEntity> findUserById(Integer id);
    List<UsersEntity> findUserByAuth(Integer auth);
}
