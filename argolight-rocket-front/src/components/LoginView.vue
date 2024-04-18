<template>
    <form name="login-form">
        <div class="mb-3">
            <label for="name">Username: </label>
            <input id="name" type="text" />
        </div>
        <div class="mb-3">
            <label for="password">Password: </label>
            <input id="password" type="password" />
        </div>
        <button class="btn btn-outline-dark" type="submit">
            Login
        </button>
    </form>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            input: {
                name: "",
                password: ""
            }
        }
    }
}
</script>