package com.fuckingspanish.backend.repository;

import com.fuckingspanish.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
