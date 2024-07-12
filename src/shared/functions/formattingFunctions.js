export const formatCnpj = (event) => {
    let input = event.target.value.replace(/\D/g, "");

    if (input.length > 14) {
        input = input.substring(0, 14);
    }

    if (input.length <= 2) {
        input = input.replace(/^(\d{0,2})/, "$1");
    } else if (input.length <= 5) {
        input = input.replace(/^(\d{0,2})(\d{0,3})/, "$1.$2");
    } else if (input.length <= 8) {
        input = input.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})/, "$1.$2.$3");
    } else if (input.length <= 12) {
        input = input.replace(
            /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})/,
            "$1.$2.$3/$4"
        );
    } else if (input.length <= 14) {
        input = input.replace(
            /^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/,
            "$1.$2.$3/$4-$5"
        );
    }

    cnpj.value = input;
};

export const formatCpf = (event) => {
    let input = event.target.value.replace(/\D/g, "");

    if (input.length > 11) {
        input = input.substring(0, 11);
    }

    if (input.length <= 3) {
        input = input.replace(/^(\d{0,3})/, "$1");
    } else if (input.length <= 6) {
        input = input.replace(/^(\d{0,3})(\d{0,3})/, "$1.$2");
    } else if (input.length <= 9) {
        input = input.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})/, "$1.$2.$3");
    } else if (input.length <= 11) {
        input = input.replace(
            /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
            "$1.$2.$3-$4"
        );
    }

    cpf.value = input;
};

export const formatNumber = (event) => {
    let input = event.target.value.replace(/\D/g, "");

    if (input.length > 0) {
        input = `(${input.substring(0, 2)}) ${input.substring(
            2,
            7
        )}-${input.substring(7, 11)}`;
    }

    corporateNumber.value = input;
};