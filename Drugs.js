export class Drug {
    constructor(props) {
        this.id = props.id + "-" + props.set_id;
        this.brandName = props.openfda.brand_name[0];
        this.manufacturerName = props.openfda.manufacturer_name[0];
        this.genericName = props.openfda.generic_name[0];
        this.purpose = props.purpose;
        this.indications_usage = props.indications_and_usage;
        this.activeIngredient = props.active_ingredient;
        this.dosage_administration = props.dosage_and_administration;
        this.warnings = props.warnings;
    }

    toHtml() {
        return `
            <div class="result" id="${this.id}">
                <div class="header">
                    <div>${this.brandName}</div>
                    <div class="status">${this.manufacturerName}/${this.genericName}</div>
                </div>

                <div class="description">
                    <div class="section close">
                        <div class="title" onClick="this.parentElement.classList.toggle('close')">Purpose</div>
                        <ul class="list">
                            ${
                                this.purpose.map( (p) => `<li class="list-inline">${p}</li>` )
                            }
                        </ul>
                    </div>

                    <div class="section close">
                        <div class="title" onClick="this.parentElement.classList.toggle('close')">Indications Usuage</div>
                        <ul class="list">
                            ${
                                this.indications_usage.map( (p) => `<li class="list-inline">${p}</li>` )
                            }
                        </ul>
                    </div>

                    <div class="section close">
                        <div class="title" onClick="this.parentElement.classList.toggle('close')">Dosage Administration</div>
                        <ul class="list">
                            ${
                                this.dosage_administration.map( (p) => `<li class="list-inline">${p}</li>` )
                            }
                        </ul>
                    </div>

                    <div class="section close">
                        <div class="title" onClick="this.parentElement.classList.toggle('close')">Active Ingredient</div>
                        <ul class="list">
                            ${
                                this.activeIngredient.map( (p) => `<li class="list-inline">${p}</li>` )
                            }
                        </ul>
                    </div>

                    <div class="section close">
                        <div class="title" onClick="this.parentElement.classList.toggle('close')">Warnings</div>
                        <ul class="list">
                            ${
                                this.warnings.map( (p) => `<li class="list-inline">${p}</li>` )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        `
    }

    static searchDrugs( props, brandName ) {
        return props.filter( 
            drug => brandName.length > 1 ? new RegExp(brandName, "i").test(
                (() => {
                    if ( drug.openfda === undefined ) return "";
                    if ( drug.openfda.brand_name === undefined ) return "";
                    return drug.openfda.brand_name ? drug.openfda.brand_name[0] : "";
                })()
            ) : (
                () => {
                    if ( 
                        drug.openfda !== undefined
                        && 
                        drug.openfda.brand_name !== undefined   
                    ) return true;
                }
            )()
        );
    }
}

