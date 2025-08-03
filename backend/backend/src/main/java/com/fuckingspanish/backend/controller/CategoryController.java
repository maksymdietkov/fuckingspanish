package com.fuckingspanish.backend.controller;

import com.fuckingspanish.backend.model.Category;
import com.fuckingspanish.backend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin // временно, чтобы фронт не ругался
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setName(updatedCategory.getName());
                    category.setDescription(updatedCategory.getDescription());
                    return categoryRepository.save(category);
                })
                .orElseThrow(() -> new RuntimeException("Category not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with id " + id);
        }
        categoryRepository.deleteById(id);
    }
}
