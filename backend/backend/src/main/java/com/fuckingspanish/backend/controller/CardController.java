package com.fuckingspanish.backend.controller;

import com.fuckingspanish.backend.model.Card;
import com.fuckingspanish.backend.repository.CardRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin
public class CardController {

    private final CardRepository cardRepository;

    public CardController(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    @GetMapping
    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    @GetMapping("/category/{categoryId}")
    public List<Card> getCardsByCategory(@PathVariable Long categoryId) {
        return cardRepository.findByCategoryId(categoryId);
    }

    @PostMapping
    public Card createCard(@RequestBody Card card) {
        return cardRepository.save(card);
    }

    @PutMapping("/{id}")
    public Card updateCard(@PathVariable Long id, @RequestBody Card updatedCard) {
        return cardRepository.findById(id)
                .map(card -> {
                    card.setQuestion(updatedCard.getQuestion());
                    card.setCategory(updatedCard.getCategory());
                    card.setAnswerOptions(updatedCard.getAnswerOptions());
                    return cardRepository.save(card);
                })
                .orElseThrow(() -> new RuntimeException("Card not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public void deleteCard(@PathVariable Long id) {
        if (!cardRepository.existsById(id)) {
            throw new RuntimeException("Card not found with id " + id);
        }
        cardRepository.deleteById(id);
    }
}
