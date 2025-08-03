package com.fuckingspanish.backend.controller;

import com.fuckingspanish.backend.model.Level;
import com.fuckingspanish.backend.repository.LevelRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/levels")
@CrossOrigin
public class LevelController {

    private final LevelRepository levelRepository;

    public LevelController(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @GetMapping
    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }

    @PostMapping
    public Level createLevel(@RequestBody Level level) {
        return levelRepository.save(level);
    }

    @PutMapping("/{id}")
    public Level updateLevel(@PathVariable Long id, @RequestBody Level updatedLevel) {
        return levelRepository.findById(id)
                .map(level -> {
                    level.setName(updatedLevel.getName());
                    return levelRepository.save(level);
                })
                .orElseThrow(() -> new RuntimeException("Level not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteLevel(@PathVariable Long id) {
        if (!levelRepository.existsById(id)) {
            throw new RuntimeException("Level not found with id " + id);
        }
        levelRepository.deleteById(id);
    }
}
