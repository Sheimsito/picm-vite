

export const botChat = {
    render({ newBotMessage = "" } = {}) {
        let date = new Date().getHours() + ":" + new Date().getMinutes();
        if (new Date().getMinutes() < 10) {
            date = new Date().getHours() + ":0" + new Date().getMinutes();
        }
        const am_pm = new Date().getHours() >= 12 ? "PM" : "AM";
        return `
        <div class="flex items-start gap-2">

            <!-- AVATAR -->
            <div class="w-10 h-10 bg-blue-500 rounded-3xl flex items-center justify-center flex-shrink-0">
                <svg class= "m-auto p-1"width="40px" height="40px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M213.333333 554.666667m-85.333333 0a85.333333 85.333333 0 1 0 170.666667 0 85.333333 85.333333 0 1 0-170.666667 0Z" fill="#16c4fe"></path><path d="M810.666667 554.666667m-85.333334 0a85.333333 85.333333 0 1 0 170.666667 0 85.333333 85.333333 0 1 0-170.666667 0Z" fill="#16c4fe"></path><path d="M832 405.333333c0-270.933333-640-177.066667-640 0v213.333334c0 177.066667 142.933333 320 320 320s320-142.933333 320-320V405.333333z" fill="#16c4fe"></path><path d="M512 64C311.466667 64 149.333333 226.133333 149.333333 426.666667v72.533333L192 533.333333v-64l448-209.066666 192 209.066666v64l42.666667-34.133333V426.666667c0-170.666667-121.6-362.666667-362.666667-362.666667z" fill="#243dff"></path><path d="M661.333333 554.666667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" fill="#000000"></path><path d="M362.666667 554.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z" fill="#000000"></path><path d="M917.333333 512c-12.8 0-21.333333 8.533333-21.333333 21.333333v-149.333333c0-187.733333-153.6-341.333333-341.333333-341.333333h-149.333334c-12.8 0-21.333333 8.533333-21.333333 21.333333s8.533333 21.333333 21.333333 21.333333h149.333334c164.266667 0 298.666667 134.4 298.666666 298.666667v213.333333c0 12.8 8.533333 21.333333 21.333334 21.333334s21.333333-8.533333 21.333333-21.333334v42.666667c0 83.2-66.133333 149.333333-149.333333 149.333333H512c-12.8 0-21.333333 8.533333-21.333333 21.333334s8.533333 21.333333 21.333333 21.333333h234.666667c106.666667 0 192-85.333333 192-192v-106.666667c0-12.8-8.533333-21.333333-21.333334-21.333333z" fill="#c0b9b9"></path><path d="M917.333333 469.333333h-21.333333c-23.466667 0-42.666667 19.2-42.666667 42.666667v85.333333c0 23.466667 19.2 42.666667 42.666667 42.666667h21.333333c23.466667 0 42.666667-19.2 42.666667-42.666667v-85.333333c0-23.466667-19.2-42.666667-42.666667-42.666667z" fill="#000000"></path><path d="M512 810.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z" fill="#000000"></path></g></svg>
            </div>

            <!-- MENSAJE DEL BOT -->
            <div class="relative bg-gray-100 p-3 rounded-lg w-fit max-w-[240px]">

                <!-- TRIÁNGULO -->
                <div class="absolute top-3 -left-2 
                            w-0 h-0 
                            border-t-8 border-b-8 border-r-8
                            border-t-transparent border-b-transparent border-r-gray-100"></div>

                ${newBotMessage}
                <div class="p-2absolute bottom-3 right-3 text-xs">
                    ${date} ${am_pm}
                </div>
            </div>

        </div>
        `;
    }
}

export const userChat = {
    render({ message = "" } = {}) {
        let date = new Date().getHours() + ":" + new Date().getMinutes();
        if (new Date().getMinutes() < 10) {
            date = new Date().getHours() + ":0" + new Date().getMinutes();
        }
        const am_pm = new Date().getHours() >= 12 ? "PM" : "AM";

        return `
        <div class="flex items-start gap-2 justify-end">

            <div class="relative bg-indigo-100 text-indigo-900 p-3 rounded-lg w-fit max-w-[240px] ml-auto">

                <!-- TRIÁNGULO DERECHA -->
                <div class="absolute top-3 -right-2 
                            w-0 h-0 
                            border-t-8 border-b-8 border-l-8
                            border-t-transparent border-b-transparent border-l-indigo-100">
                </div>

                ${message}
                <div class="p-2absolute bottom-3 right-3 text-xs">
                    ${date} ${am_pm}
                </div>
            </div>
        </div>
        `;
    }
}





export const chat = {
    render({
        newUserMessage = "" || null,
        newBotMessage = "" || null
    }) {
        return `
        <div class="fixed inset-0 bg-black/30" id="chat-overlay"></div>

        <div class="fixed bottom-24 right-10 w-96 h-[520px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden animate-[popup-in_0.25s_ease] z-[1001]">

            <!-- HEADER -->
            <div class="p-4 bg-[var(--color-primary)] text-white">
                <h2 class="text-lg font-semibold">Asistente Virtual</h2>
            </div>

            <!-- BODY (AQUÍ SE INYECTAN LOS MENSAJES DEL BOT) -->
            <div id="chat-body" class="flex-1 p-4 overflow-y-auto space-y-3">
                ${ newBotMessage 
                    ? botChat.render({ newBotMessage })
                    : ""
                }
                ${ newUserMessage 
                    ? userChat.render({ message: newUserMessage })
                    : "" 
                }
                
            </div>

            <!-- FOOTER -->
            <div class="p-3 border-t border-gray-400 flex items-center gap-2">
                <textarea id="chat-input"
                    class="flex-1 border border-gray-400 rounded-md p-2 resize-none focus:outline-[var(--color-primary)]"
                    placeholder="Escribe aquí tu mensaje"
                ></textarea>

                <button id="send-btn"
                    class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.5 -0.5 16 16" stroke-linecap="round" stroke-linejoin="round" stroke="var(--color-bg)" id="Send--Streamline-Mynaui" height="30" width="30">
                    <path d="m8.75 6.25 -1.875 1.875m5.805 -6.230625a0.33437500000000003 0.33437500000000003 0 0 1 0.42500000000000004 0.42562500000000003l-3.7025 10.58125a0.33437500000000003 0.33437500000000003 0 0 1 -0.62125 0.025l-2.011875 -4.52625a0.33375 0.33375 0 0 0 -0.169375 -0.169375l-4.52625 -2.0125a0.33437500000000003 0.33437500000000003 0 0 1 0.025 -0.620625z" stroke-width="1"></path>
                    </svg>
                </button>
            </div>

        </div>
        `;
    }
}

