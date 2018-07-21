import java.util.function.Function;

public class Solution44 implements Function<String, String> {
    @Override
    public String apply(String s) {
        s = " " + s + " ";
        while (!s.equals(p(s))) {
            s = p(s);
        }
        return s;
    }

    static String a(String s) {
        return s.replace("/ ", "__").replace("/| ", "/( ").replace("/|_", "/(_").replace("/|/", "/(/").replace("/|)", "//)").replace("/||", "/(|");
    }

    static String x(String s) {
        return s.replace("(", "/").replace(")", "\\");
    }

    static String r(String s) {
        return new StringBuilder(s).reverse().toString().replace("/", "a").replace("\\", "/").replace("a", "\\").replace("(", "a").replace(")", "(").replace("a", ")");
    }

    static String p(String s) {
        return x(r(a(r(a(s)))));
    }
}
