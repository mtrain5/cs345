import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MyArrayTest {
    @Test
    void testConstructor() {
        MyArray myArray = new MyArray(5);
        assertNotNull(myArray);
    }
