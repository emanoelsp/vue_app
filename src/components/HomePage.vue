<template>
    <div class="h-screen bg-blue-600 text-white text-center p-10">
        <h1 class="text-4xl font-bold my-5 animated-fade-in-down">Bem-Vindo</h1>
        <p>Conteudo da home page</p>
        <router-link to="/sobre">Vá para Página Sobre</router-link>
        <router-link to="/contato">Vá para Página de Contato</router-link>

        <div class="footer">
            <p>&copy; 2023 - SENAI - Todos os Direitos Reservados</p>
        </div>
    </div>

</template>

<script>
export default {
    name: "HomePage"
}
</script>

<style>
.animated-fade-in-down {
    animation: fade-in-down 1.5s ease-out;
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fade-in-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

</style>
