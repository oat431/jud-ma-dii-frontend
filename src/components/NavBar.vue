<template>
    <div class="navbar bg-base-100 shadow">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">JudSue JudJang</a>
        </div>
        <div class="flex-none">
            <div>
                Welcome {user}
            </div>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://picsum.photos/id/237/200/300" />
                    </div>
                </label>
                <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
