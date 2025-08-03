package com.fuckingspanish.backend.repository;

import com.fuckingspanish.backend.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByCategoryId(Long categoryId);
}
