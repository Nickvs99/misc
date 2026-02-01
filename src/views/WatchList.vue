<template>
    <div id="watchlist-container">
        <div v-if="this.watchList == null">
            <div>Upload kijklijst</div>
            <input type="file" id="file-selector" />
        </div>
        <div v-else>
            <button @click="this.saveOrder()" class="save-button">Save</button>
            <table class="watchlist-table">
                <tr>
                    <th>Positie</th>
                    <th>Titel</th>
                    <th>Orgineel</th>
                    <th>Bonus</th>

                    <th></th>
                    <th></th>
                    <th>Totaal</th>
                </tr>
                <tr v-for="item in this.orderedItems(this.watchList)" :key="item.title">
                    <td>{{ item.position }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.originalScore }}</td>
                    <td>{{ item.bonus }}</td>

                    <td><button @click="item.bonus -= 1" class="watchlist-order-button">&uarr;</button></td>
                    <td><button @click="item.bonus += 1" class="watchlist-order-button">&darr;</button></td>

                    <td>{{ item.originalScore + item.bonus }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            watchList: null,
            header: null,
            lineSeperator: "\r\n",
        };
    },

    mounted() {
        const fileSelector = document.getElementById("file-selector");
        fileSelector.addEventListener("change", (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener(
                "load",
                () => {
                    this.parseUploadedData(reader.result);
                },
                false,
            );
            const text = reader.readAsText(file);

            console.log(file);
            console.log(text);
        });
    },

    methods: {
        parseUploadedData(text) {
            this.watchList = [];

            console.log(text);
            const lines = text.split(this.lineSeperator);
            this.header = lines[0];
            for (let i = 1; i < lines.length; i++) {
                const lineSplit = lines[i].split(",");

                if (lineSplit.length != 2) {
                    console.warn(`The line "${lines[i]}" has an unexpected number of seperator symbols.`);
                    continue;
                }

                this.watchList.push({
                    title: lineSplit[0],
                    originalScore: Number(lineSplit[1]),
                    bonus: 0,
                    position: i,
                });
            }

            console.log(this.watchList);
        },

        orderedItems(items) {
            let sorted = items.sort((a, b) => this.sortWatchListFn(a, b));
            for (let i = 0; i < sorted.length; i++) {
                sorted[i].position = i + 1;
            }
            return sorted;
        },

        sortWatchListFn(a, b) {
            let scoreA = a.originalScore + a.bonus;
            let scoreB = b.originalScore + b.bonus;

            if (scoreA > scoreB) return 1;
            else if (scoreA == scoreB) {
                if (a.bonus > b.bonus) return 1;
                else if (a.bonus == b.bonus) return 0;
                else return -1;
            } else return -1;
        },

        sortOriginalScore(a, b) {
            if (a.originalScore > b.originalScore) return 1;
            if (a.originalScore == b.originalScore) return 0;
            else return -1;
        },

        saveOrder() {
            let originalOrder = this.watchList.sort((a, b) => this.sortOriginalScore(a, b));

            let text = this.header + this.lineSeperator;
            for (let item of originalOrder) {
                text += `${item.title},${item.position}${this.lineSeperator}`;
            }

            this.download(text, "kijklijst.csv", "text");
        },

        download(data, filename, type) {
            var file = new Blob([data], { type: type });
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        },
    },
};
</script>

<style lang="scss" scoped>
#watchlist-container {
    .save-button {
        margin: 1em;
    }
    .watchlist-table {
        margin: auto;
        border-spacing: 0;

        tr {
            margin: 1em;
            td {
                padding: 1px;
            }
        }
        tr:nth-child(odd) td {
            background-color: #f3f3f3;
        }
    }
    .watchlist-order-button {
        padding: 0.5em;
        font-size: 1.25em;
    }
}
</style>
