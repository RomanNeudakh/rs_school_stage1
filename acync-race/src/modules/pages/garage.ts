export const garage = `
    <header class="header"> 
        <div class="header_container">
            <h1 class="header_container_logo">
                <a href="/">Async Race</a>
            </h1>
        </div>
    </header>
    <main class="main">
        <div class="main_container-garage">
            <div class="main_container-garage_nav">
                <button class="main_container-garage_nav_togarage">
                    <a href="/garage">TO GARAGE</a>
                </button>
                <button class="main_container-garage_nav_towinners">
                    <a href="/winners">TO WINNERS</a>
                </button>
            </div>
            <div class="main_container-garage_create">
                <input type="text" class="main_container-garage_create_input-text">
                <input type="color" class="main_container-garage_create_input-color">
                <button class="main_container-garage_create_button-create">CREATE</button>
            </div>
            <div class="main_container-garage_update">
                <input type="text" class="main_container-garage_update_input-text">
                <input type="color" class="main_container-garage_update_input-color">
                <button id="update" class="main_container-garage_update_button-update">UPDATE</button>
            </div>
            <div class="main_container-garage_control">
                <button class="main_container-garage_race-button">RACE</button>
                <button class="main_container-garage_reset-button">RESET</button>
                <button class="main_container-garage_generate-button">GENERATE</button>
            </div>
            <div class="main_container-garage_winners-count">Garage()</div>
            <div class="main_container-garage_winners-page-number">Page#</div>
            <div class="main_container-garage_track">

            </div>
            <div class="main_container-garage_input">
                Winners per page: <input id="cars_per_page" type="number" min="1" max="10" placeholder="" 
                class="main_container-garage_input_winners-per-page">
            </div>
            <div class="main_container-garage_nav-pagination">
                <button class="main_container-garage_nav-pagination_prev">PREV</button>
                <button class="main_container-garage_nav-pagination_next">NEXT</button>
            </div>
        </div>
    </main>
    <footer class="footer">
    <div class="footer_container">
        <a class="footer_container_rs-school" href="https://rs.school/js/"></a>
        <div class="footer_container_year">
            2023
        </div>
        <a class="footer_container_git-hub" href="https://github.com/RomZeZZZ"></a>
    </div>
    </footer>
`;
