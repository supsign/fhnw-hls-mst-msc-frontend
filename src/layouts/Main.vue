<template>
    <div class="w-full h-auto bg-hls">
        <div class="container flex flex-col md:flex-row justify-between mx-auto px-3">
            <div @click="$router.push('/')" class="no-underline">
                <div class="flex space-x-4">
                    <img
                        class="p-2 md:py-4 max-h-12 md:max-h-20"
                        src="../assets/logos/fhnw_hls_e_10mm.png"
                        alt="Logo FHNW"
                    />
                </div>
            </div>
        </div>
    </div>
    <main class="h-screen">
        <router-view />
    </main>
    <footer class="p-2 w-full text-white bg-black">
        <div class="flex justify-start py-5 mx-auto container border-b">
            <div>
                <div class="text-lg my-1">Contact</div>
                <div class="text-gray-400">
                    <p>School of Life Sciences FHNW</p>
                    <p>Institute for Chemistry and Bioanalytics</p>
                    <p>Hofackerstrasse 30 :: 4132 Muttenz</p>
                    <br />
                    <p>
                        Prof. Dr. Georg Lipps
                        <a
                            href="https://www.fhnw.ch/en/people/georg-lipps/"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-400 hover:text-gray-300"
                            >https://www.fhnw.ch/en/people/georg-lipps</a
                        >
                    </p>
                    <p>
                        E-mail:
                        <a
                            href="mailto:georg.lipps@fhnw.ch"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-400 hover:text-gray-300"
                            >georg.lipps@fhnw.ch</a
                        >
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>
