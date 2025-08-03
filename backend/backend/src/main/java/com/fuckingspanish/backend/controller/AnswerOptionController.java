package com.fuckingspanish.backend.controller;

import com.fuckingspanish.backend.model.AnswerOption;
import com.fuckingspanish.backend.repository.AnswerOptionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answer-options")
@CrossOrigin
public class AnswerOptionController {

    private final AnswerOptionRepository answerOptionRepository;

    public AnswerOptionController(AnswerOptionRepository answerOptionRepository) {
        this.answerOptionRepository = answerOptionRepository;
    }

    @GetMapping
    public List<AnswerOption> getAllAnswerOptions() {
        return answerOptionRepository.findAll();
    }

    @GetMapping("/card/{cardId}")
    public List<AnswerOption> getAnswerOptionsByCard(@PathVariable Long cardId) {
        return answerOptionRepository.findByCardId(cardId);
    }

    @PostMapping
    public AnswerOption createAnswerOption(@RequestBody AnswerOption answerOption) {
        return answerOptionRepository.save(answerOption);
    }

    @PutMapping("/{id}")
    public AnswerOption updateAnswerOption(@PathVariable Long id, @RequestBody AnswerOption updatedOption) {
        return answerOptionRepository.findById(id)
                .map(option -> {
                    option.setText(updatedOption.getText());
                    option.setCorrect(updatedOption.isCorrect());
                    option.setCard(updatedOption.getCard());
                    return answerOptionRepository.save(option);
                })
                .orElseThrow(() -> new RuntimeException("AnswerOption not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteAnswerOption(@PathVariable Long id) {
        if (!answerOptionRepository.existsById(id)) {
            throw new RuntimeException("AnswerOption not found with id " + id);
        }
        answerOptionRepository.deleteById(id);
    }
}
