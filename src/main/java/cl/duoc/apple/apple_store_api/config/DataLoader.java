package cl.duoc.apple.apple_store_api.config;

import cl.duoc.apple.apple_store_api.model.Product;
import cl.duoc.apple.apple_store_api.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                productRepository.save(new Product(null, "iPhone 14", "Chip A16 Bionic. Pantalla Super Retina XDR 6.1 pulgadas. Cámara dual 12MP con Night mode mejorado. Batería de larga duración. Resistencia al agua IP68. Conectividad 5G. Carga inalámbrica MagSafe.", new BigDecimal("799.00"), "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop", 10));
                productRepository.save(new Product(null, "MacBook Air M2", "Chip M2 ultradelgado y portátil. Procesador de 8 núcleos con GPU integrada. 8GB RAM, 256GB SSD. Pantalla Liquid Retina 13.3 pulgadas. Batería hasta 15 horas. Thunderbolt 3 y Magic Keyboard retroiluminado.", new BigDecimal("1199.00"), "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop", 5));
                productRepository.save(new Product(null, "iPad Pro", "Pantalla Liquid Retina 11 pulgadas. Procesador M2 potente. 8GB RAM, 128GB almacenamiento. Compatible con Apple Pencil 2ª generación. Cámaras 12MP frontal y trasera. 5G y WiFi 6E. Ideal para creativos y profesionales.", new BigDecimal("999.00"), "https://images.unsplash.com/photo-1621715225783-b361297d0e8f?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 8));
            }
        };
    }
}
