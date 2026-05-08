(($) => {

    let templates = {};

    const log = (...args) => {
        if (typeof console !== 'undefined' && console.log) {
            let array = Array.from(args);
            array.unshift('[ff]');
            console.log(...array);
        }
    };

    let templateSectionExecutor = (sections) => {
        return (name) => {
            if (!(name in sections)) throw 'section not found: ' + name;
            let text = sections[name];
            let ret = doT.compile(text);
            return ret;
        };
    };

    let seceval = async (code, templateSections) => {
        const evaluatedCode = eval(code);
        const ret = await evaluatedCode($, window.$ff, templateSections);
        return ret;
    };

    let loadTemplate = async (comp) => {
        log('loading', comp);
        const templateText = await $.ajax({
            url: comp,
            dataType: 'text'
        });

        // 1. Extract script content with regex
        const scriptRegex = /<script>([\s\S]*?)<\/script>/i;
        const scriptMatch = templateText.match(scriptRegex);
        if (!scriptMatch || !scriptMatch[1]) {
            throw 'Component must have exactly one <script/> tag';
        }
        const templateScript = scriptMatch[1];

        // 2. Extract sections with regex
        const sectionRegex = /<ffsection\s+id="([^"]+)">([\s\S]*?)<\/ffsection>/gi;
        const sectionTemplates = {};
        let match;
        while ((match = sectionRegex.exec(templateText)) !== null) {
            const id = match[1];
            const content = match[2].trim();
            if (sectionTemplates[id]) {
                throw 'ffsection id duplicated: ' + id;
            }
            sectionTemplates[id] = content;
        }

        const sections = templateSectionExecutor(sectionTemplates);
        // Wrap the script in parentheses to ensure it's evaluated as an expression
        const ret = await seceval(`(${templateScript})`, sections);
        return ret;
    };

    let $ff = async (comp) => {
        log('Running:', comp);

        let ret = templates[comp];
        if (!ret) {
            ret = loadTemplate(comp);
            templates[comp] = ret; // Cache the promise
        }
        return await ret;
    };

    window.$ff = $ff;

})(jQuery);