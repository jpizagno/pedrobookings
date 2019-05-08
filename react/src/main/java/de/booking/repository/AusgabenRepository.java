package de.booking.repository;

import de.booking.model.Ausgaben;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AusgabenRepository extends PagingAndSortingRepository<Ausgaben, Long> {
}
