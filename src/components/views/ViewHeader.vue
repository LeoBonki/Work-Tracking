<template>

    <!-- HEADER -->
    <div class="container">
        <header>

            <!-- NAMING & LOGO -->
            <div>
                <h1 @click="RedirectToHome">
                    <img src="../img/logo_img.png" />
                    Work-Tracker
                </h1>
            </div>

            <!-- SITE PAGE -->
            <div>
                <button type="button" class="btn btn-light" @click="RedirectToHome">Home</button>
                <button type="button" class="btn btn-light" @click="RedirectToJobPost">Job post</button>
            </div>

        </header>
    </div>
</template>

<script>
export default {
    methods: {
        RedirectToHome() {
            this.$router.push({ name: 'Home' });
        },
        RedirectToJobPost() {
            this.$router.push({ name: 'JobPost' });
        },
    },
};

</script>

<style scoped>
* {
    background-color: transparent;
}

.container {
    max-width: 100%;
    border-bottom: solid 5px #0a0a0a80;
    font-family: 'Poppins';
    background: linear-gradient(90deg, #16171e 0%, #2d2f3e 50%, #16171e 100%);
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;

    width: 1300px;
    height: 100%;
    margin: 0 auto;
}

img {
    max-width: 10%;
    max-height: 10%;
}

h1 {
    color: #2ea0ed;
    font-weight: bold;
    cursor: pointer;
}

button {
    margin-left: 15px;
    border-radius: 0.25rem;
    background-color: #2ea0ed;
    padding: 0.375rem 0.75rem;
    font-weight: bold;
}

h1:hover {
    color: #20B2AA;
}

</style>