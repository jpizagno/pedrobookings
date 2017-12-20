package de.booking.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;
import static org.mockito.Matchers.isNotNull;

import org.junit.Test;

public class ManagerTest {

	@Test
	public void test() {
		Manager testConstructor = new Manager();
		Manager mgmt = new Manager("user" , "password", "role1");
		assertThat( mgmt.getPassword(), is(notNullValue()) );
		assertThat( mgmt.getName(), is("user") );
		assertThat( mgmt.getRoles()[0], is("role1") );
		
		mgmt.setName("newName");
		assertThat(mgmt.getName() , is("newName"));
		
		String[] rolesIn = {"role2"};
		mgmt.setRoles(rolesIn);
		assertThat(mgmt.getRoles()[0] , is("role2") );
		
		mgmt.setId(1000l);
		assertThat(mgmt.getId(), is(1000l));
	}

}
