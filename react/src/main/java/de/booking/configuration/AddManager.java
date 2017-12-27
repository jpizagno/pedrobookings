package de.booking.configuration;

import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import de.booking.repository.Manager;
import de.booking.repository.ManagerRepository;

/**
 * This class is meant to run from the command line (without Spring or JPA).  
 * Script in .{project-root}/scripts/add_manager.sh will call this code.
 * 
 * @author jpizagno
 *
 */
public class AddManager {

	public static void main(String[] args) {
		AddManager addMgmt = new AddManager();
		addMgmt.add(args);
	}

	private void add(String[] args) {

		// get connection to Database
		Configuration configuration = new Configuration();
		configuration.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5InnoDBDialect");
		configuration.setProperty("hibernate.connection.driver_class","com.mysql.jdbc.Driver");
		configuration.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/"+ args[0]);
		configuration.setProperty("hibernate.connection.password", args[2]);
		configuration.setProperty("hibernate.connection.username", args[1]); 
		
		// get a session
		configuration.addAnnotatedClass(de.booking.repository.Manager.class);
		SessionFactory sessionFactory = configuration.buildSessionFactory();
		Session session = sessionFactory.openSession();
		
		Manager mgmt = new Manager(args[3], args[4],"ROLE_MANAGER");
		
		try {
			session.beginTransaction();
			session.save(mgmt);
			session.getTransaction().commit();
		}
		catch (HibernateException e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		}
	}

}
