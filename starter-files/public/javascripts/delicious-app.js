import "../sass/style.scss";

import { $, $$ } from "./modules/bling";
import autocomplete from "./modules/autocomplete";

console.log("object");

autocomplete($("#address"), $("#lat"), $("#lng"));
