<template>
    <div class="contact-page bg-light p-4">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us!</p>
        <form>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" required />    
            
                <label for="email">Email:</label>
                <input type="email" id="email" required /> 
           
                <label for="message">Message:</label>
                <textarea id="message"  required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
        </form>
    </div>    
</template>

<script lang="ts">
export default {
    name: 'ContactPage'
}
</script>