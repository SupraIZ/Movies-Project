// ...existing code...
const submitHandler = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message || 'Registration failed');
        }
        console.log('User registered successfully:', data);
        // ...existing code...
    } catch (error) {
        console.error('Error during registration:', error.message || error);
        alert(error.message || 'An unexpected error occurred');
    }
};
// ...existing code...
