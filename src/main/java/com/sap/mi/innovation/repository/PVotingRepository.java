package com.sap.mi.innovation.repository;

import com.sap.mi.innovation.model.PVotingEntity;
import org.omg.PortableInterceptor.INACTIVE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by I309908 on 1/26/2016.
 */
@Repository
public interface PVotingRepository extends JpaRepository<PVotingEntity, Integer> {
}
