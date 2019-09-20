<template>
    <div class="navbar">
        <nav class="nav-extended indigo darken-2">
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <span class="nav-title">Ahmed Smoothies</span>
                </router-link>
                <a href="" class="btn-floating btn-large halfway-fab pink">
                    <router-link :to="{ name: 'AddSmoothie' }">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                
            }
        },
    }
</script>

<style scoped>
    .navbar nav {
        padding: 0 3rem
    }
    nav .nav-title {
        padding: 1rem 0;
        font-size: 2rem
    }
</style>