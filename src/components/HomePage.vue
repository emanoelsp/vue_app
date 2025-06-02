<template>
    <div class="h-screen bg-blue-600 text-white text-center p-10">
        <h1 class="text-4xl font-bold my-5 animate-pulse">Bem-Vindo</h1>
        <p class="animated-fade-in-down" >Conteudo da home page</p>

        <button class="m-10 bg-white text-blue-600 px-4 py-2 
                    rounded hover:bg-gray-200"
         @click="$router.push('/contato')">
            Ir para contato
        </button>
        <div class="footer animate-fade-in-up">
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

.animate-pulse {
    animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
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
