<template>
    <div class="flex flex-col justify-center gap-5">
        <div class="text-lg font-bold">Personal Data</div>
        <Input label="Surname" />
        <Input label="Given Name" />
        <Select label="Semester" :options="[]" />
        <Select label="Study Mode" :options="[]" />
        <Select label="Specialization" :options="[]" />
    </div>
</template>
<script setup lang="ts"></script>
