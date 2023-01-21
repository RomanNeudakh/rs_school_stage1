// import { variables } from '../variables';
export const winners = `
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
            <div class="main_container-garage_winners-count">Winners()</div>
            <div class="main_container-garage_winners-page-number">Page#</div>
            <table class="main_container-garage_table">
                <thead>
                    <tr class="main_container-garage_table_tr">
                        <th class="main_container-garage_table_tr_th">№</th>
                        <th class="main_container-garage_table_tr_th">Car</th>
                        <th class="main_container-garage_table_tr_th">Name</th>
                        <th data-wins=true class="main_container-garage_table_tr_th">Wins</th>
                        <th data-time=true class="main_container-garage_table_tr_th">Best Time</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                </tbody>
            </table>
            <div class="main_container-garage_input">
                Winners per page: <input type="number" min="1" max="10" placeholder="sad" 
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
