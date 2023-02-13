package com.fss.reembolso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class ReembolsoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReembolsoApplication.class, args);
	}

}
