<template>
    <nav class="navbar">
        <router-link class="navbar-item" to="/"><HomeIcon class="navbar-svg" /></router-link>
        <router-link class="navbar-item" to="/key-generator">Key-Generator</router-link>
        <router-link class="navbar-item" to="/timer">Timer</router-link>
        <router-link class="navbar-item" to="/kijklijst">Kijklijst</router-link>
    </nav>
</template>

<script>
import HomeIcon from "@/assets/icons/HomeIcon.vue";

export default {
    name: "NavBar",
    components: { HomeIcon },
};
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 1rem;
    padding: 1rem;

    svg {
        width: 2rem;
        height: 2rem;
    }
}

.navbar-item {
    display: inline-block;
}
</style>
