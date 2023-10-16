<template>
    <header class="d-flex flex-row bg-dark-blue">
        <div class="branding d-flex bg-blue justify-content-center">
            <i class="bi bi-receipt-cutoff"></i>
        </div>
    </header>
</template>


<script>
export default {
    name: "navigation",
}
</script>


<style lang="scss" scoped>
    header {
        z-index: 99;
        @media(min-width: 900px) {
            min-height: 100%;
            min-width: 90px;
            flex-direction: column;
            border-radius: 0 20px 20px 0;
        }
    }

    .branding {
        border-radius: 0 20px 20px 0;
        padding: 20px 30px;
        @media(min-width: 900px) {
            width: 100%;
            height: fit-content;
        }
    }

    .bi-receipt-cutoff {
        width: auto;
        font-size: 30px;
        color: var(--prussian-blue);
    }
</style>