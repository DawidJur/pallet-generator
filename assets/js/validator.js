class PalletDataValidator
{
    validate = () => {
        this.getDataFromForm();
        if (!this.areAllInputsFilled()) {
            $('#inputs-errors').text('Nie wszystkie pola formularza zostały wypełnione');
            return false;
        }
        if (!this.isNumberOfBoardsInt()) {
            $('#inputs-errors').text('Liczba desek nie jest liczbą całkowitą');
            return false;
        }
        if (!this.areAllNumbersGreaterThan0()) {
            $('#inputs-errors').text('Nie wszystkie liczby są większe od 0');
            return false;
        }
        if (!this.doPalletsHaveAtLeast2Boards()) {
            $('#inputs-errors').text('Paleta musi mieć co najmniej 2 deski');
            return false;
        }
        if (!this.arentBoardsWiderThatPallet()) {
            $('#inputs-errors').text('Suma długości desek jest większa niż długość palety');
            return false;
        }
        if (!this.areWidthAndHeightCorrect()) {
            $('#inputs-errors').text('Paleta nie może być dłuższa niż 5000mm i szersza niż 2400mm');
            return false;
        }

        $('#inputs-errors').text('');

        return true;
    }

    getDataFromForm = () => {
        this.allInputs = $("#inputs-container > input");

        this.width = $('#pallet-width').val();
        this.length = $('#pallet-length').val();
        this.numberOHorizontalBoards = $('#pallet-top-boards').val();
        this.numberOfVerticalBoards = $('#pallet-transverse-boards').val();
        this.widthOfVerticalBoard = $('#pallet-top-board-width').val();
        this.widthOfHorizontalBoard =  $('#pallet-transverse-board-width').val();
        this.baseBlockHeight =  $('#base-block-height').val();
        this.baseBoardWidth = $('#base-board-width').val();
        this.baseBoardNumber = $('#base-boards-number').val();
        this.boardThickness = $('#board-thickness').val();
    }

    areAllInputsFilled = () => {
        return (this.allInputs.filter(function () { return $.trim($(this).val()).length === 0}).length === 0);
    }

    arentBoardsWiderThatPallet = () => {
        return (this.width >= this.numberOfVerticalBoards * this.widthOfVerticalBoard &&
            this.length >= this.numberOHorizontalBoards * this.widthOfHorizontalBoard);
    }

    doPalletsHaveAtLeast2Boards = () => {
        return (this.numberOHorizontalBoards >= 2 &&
            this.numberOfVerticalBoards >= 2 &&
            this.baseBoardNumber >= 2);
    }

    isNumberOfBoardsInt = () => {
        return (Math.floor(this.numberOHorizontalBoards) == this.numberOHorizontalBoards &&
        Math.floor(this.numberOfVerticalBoards) == this.numberOfVerticalBoards);
    }
    areAllNumbersGreaterThan0 = () => {
        return (this.width > 0 &&
        this.length > 0 &&
        this.numberOHorizontalBoards > 0 &&
        this.numberOfVerticalBoards > 0 &&
        this.widthOfVerticalBoard > 0 &&
        this.widthOfHorizontalBoard > 0);
    }
    areWidthAndHeightCorrect = () => {
        let maxLength = 5000;
        let maxWidth = 2400;

        return (this.length <= maxLength &&
        this.width <= maxWidth);
    }
}