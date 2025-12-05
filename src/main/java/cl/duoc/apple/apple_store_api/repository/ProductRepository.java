package cl.duoc.apple.apple_store_api.repository;

import cl.duoc.apple.apple_store_api.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
