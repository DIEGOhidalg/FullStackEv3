package cl.duoc.apple.apple_store_api.controller;

import cl.duoc.apple.apple_store_api.model.Product;
import cl.duoc.apple.apple_store_api.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> list() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        Product saved = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product product) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(product.getName());
            existing.setDescription(product.getDescription());
            existing.setPrice(product.getPrice());
            existing.setImageUrl(product.getImageUrl());
            existing.setStock(product.getStock());
            productRepository.save(existing);
            return ResponseEntity.ok(existing);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return productRepository.findById(id).map(existing -> {
            productRepository.delete(existing);
            return ResponseEntity.noContent().<Void>build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
