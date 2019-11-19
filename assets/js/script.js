class PalletGenerator {
    updateValuesOfObject = () => {
        this.pallet = {
            width: $('#pallet-width').val(),
            length: $('#pallet-length').val(),
            numberOHorizontalBoards: $('#pallet-top-boards').val(),
            numberOfVerticalBoards: $('#pallet-transverse-boards').val(),
            widthOfVerticalBoard: $('#pallet-top-board-width').val(),
            widthOfHorizontalBoard: $('#pallet-transverse-board-width').val(),
            baseBlockHeight: $('#base-block-height').val(),
            baseBoardWidth: $('#base-board-width').val(),
            baseBoardNumber: $('#base-boards-number').val(),
            boardThickness: $('#board-thickness').val(),
        }
    }

    generateBoards = (boardsContainerId, numberOfBoards, boardSize, palletSize, typeOfGrid) => {
        $(boardsContainerId).text('');

        let columnsStyle = '';
        for (let i = 1; i <= numberOfBoards; i++) {
            if (i !== 1) {
                $(boardsContainerId).append('<div class="break"></div>');
                columnsStyle = columnsStyle + this.returnBreakSize(palletSize, boardSize, numberOfBoards) + '% ';
            }
            $(boardsContainerId).append('<div class="board"></div>');

            //solving problem with periodic numbers that sum of grid wasn't 100% and there was 1px too less
            if (i !== (numberOfBoards)) {
                columnsStyle = columnsStyle + ((boardSize / palletSize) * 100) + '% ';
            } else {
                columnsStyle = columnsStyle + 'auto';
            }
        }

        let style = '';
        if (typeOfGrid == 'column') {
            style = {'grid-template-columns': columnsStyle};
        } else if(typeOfGrid == 'row') {
            style = {'grid-template-rows': columnsStyle};
        }
        $(boardsContainerId).css(style);
    }

    returnBreakSize = (width, boardWidth, numberOfBoards) => {
        return ((((width - (boardWidth * numberOfBoards)) / (numberOfBoards - 1)) / width) * 100);
    }

     resizePalletContainer = () => {
        const maxSizeOnSiteInPx = 600;

        let width  = this.pallet.width;
        let length = this.pallet.length;
        let scale = 1;
        while (width > maxSizeOnSiteInPx || length > maxSizeOnSiteInPx) {
            width = width / 1.1;
            length = length / 1.1;
            scale = scale / 1.1;
        }

        let palletTotalHeight = Math.floor(((3 * this.pallet.boardThickness) + (this.pallet.baseBlockHeight * 1)) * scale) + 'px';

        $('#pallet-top-container > .grid-container').css({'width': Math.floor(width), 'height': Math.floor(length)});
        $('#pallet-top-height-info').css({'line-height': Math.floor(length) + 'px'});
        $('#pallet-front-container > .grid-container').css({'width': palletTotalHeight, 'height': Math.floor(length)});
        $('#pallet-top-width-info').css({'padding-left': (width / 2 - 24) + 'px'});
        $('#pallet-side-container > .grid-container').css({'width': width + 'px', 'height': palletTotalHeight});
        $('#pallet-view').css({'grid-template-columns': (width + 100) + 'px auto', 'grid-template-rows': (length + 40) + 'px auto'});
    }

    setProportionsOfFrontAndSideViews = () => {
        let sumHeight = this.pallet.boardThickness * 3 + this.pallet.baseBlockHeight * 1;
        let rowsStyle = (this.pallet.boardThickness / sumHeight * 100) + '% ' +
            (this.pallet.boardThickness / sumHeight * 100) + '% ' +
            (this.pallet.baseBlockHeight / sumHeight * 100) + '% ' +
            'auto';

        $('#pallet-front-container > .grid-container').css({'grid-template-columns': rowsStyle});
        $('#pallet-side-container > .grid-container').css({'grid-template-rows': rowsStyle});
    }

    addInfoAboutWidthAndLength = () => {
        $('#pallet-top-width-info').text(this.pallet.width + ' mm');
        $('#pallet-top-height-info').text(this.pallet.length + ' mm');
        $('#pallet-front-height-info').text(this.pallet.boardThickness * 3 + this.pallet.baseBlockHeight * 1 + ' mm');
    }


    refreshOnInputChange = () => {
        let validator = new PalletDataValidator();
        if (validator.validate()) {
            this.updateValuesOfObject();
            this.resizePalletContainer();
            this.generateBoards('#pallet-top-top-boards', this.pallet.numberOfVerticalBoards, this.pallet.widthOfVerticalBoard, this.pallet.width, 'column');
            this.generateBoards('#pallet-top-transverse-boards', this.pallet.numberOHorizontalBoards, this.pallet.widthOfHorizontalBoard, this.pallet.length, 'row');
            this.generateBoards('#pallet-top-bottom-boards', this.pallet.baseBoardNumber, this.pallet.baseBoardWidth, this.pallet.length, 'row');

            this.generateBoards('#pallet-front-top-boards', this.pallet.numberOHorizontalBoards, this.pallet.widthOfHorizontalBoard, this.pallet.length, 'row');
            this.generateBoards('#pallet-front-base-block-height', this.pallet.baseBoardNumber, this.pallet.baseBoardWidth, this.pallet.length, 'row');
            this.generateBoards('#pallet-front-base-board', this.pallet.baseBoardNumber, this.pallet.baseBoardWidth, this.pallet.length, 'row');

            this.generateBoards('#pallet-side-transverse-boards', this.pallet.numberOfVerticalBoards, this.pallet.widthOfVerticalBoard, this.pallet.width, 'column');
            this.generateBoards('#pallet-side-blocks', this.pallet.numberOfVerticalBoards, this.pallet.widthOfVerticalBoard, this.pallet.width, 'column');

            this.setProportionsOfFrontAndSideViews();
            this.addInfoAboutWidthAndLength();
        }
    }
}

palletGenerator = new PalletGenerator();

//init
function init() {
    if (window.jQuery) {
        palletGenerator.refreshOnInputChange();
    } else {
        setTimeout(function() { init() }, 50);
    }
}
init();


$('#inputs-container > input').on("keyup", palletGenerator.refreshOnInputChange);