<template>
    <div class="w-full h-auto bg-hls">
        <div class="container flex flex-col md:flex-row justify-between mx-auto px-3">
            <div @click="$router.push('/')" class="no-underline">
                <div class="flex space-x-4">
                    <img
                        class="p-2 md:py-4 max-h-12 md:max-h-20"
                        src="../assets/logos/fhnw-logo-klein.png"
                        alt="Logo FHNW"
                    />
                    <div class="my-auto text-lg text-black hover:text-black">
                        MSc in Life Sciences FHNW – Plan your studies
                    </div>
                </div>
            </div>
        </div>
    </div>
    <img class="object-cover w-full max-h-20" src="../assets/impression/impression.jpg" alt="Logo Impression" />
    <main class="h-screen">
        <router-view />
    </main>
    <footer class="p-2 fixed bottom-0 w-full text-xs text-white bg-gray-700">
        <div class="text-center sm:flex sm:justify-between">
            <a href="https://supsign.ch" target="_blank" rel="noopener noreferrer" class="block mb-2 sm:mb-0">
                &copy; Made with &hearts; in Switzerland by Supsign AG
            </a>
        </div>
    </footer>
</template>
