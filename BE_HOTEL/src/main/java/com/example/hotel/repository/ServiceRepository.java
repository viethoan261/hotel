package com.example.hotel.repository;

import com.example.hotel.dto.stat.StatDTO;
import com.example.hotel.model.ServiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel, UUID> {
    @Query("select s from ServiceModel s order by s.status desc")
    List<ServiceModel> getAllService();

    @Query(value = "select new com.example.hotel.dto.stat.StatDTO(s.name, sum(us.quantity)) from UsedServiceModel us join ServiceModel s on s.id = us.serviceID group by us.serviceID")
    List<StatDTO> getStat();
}
